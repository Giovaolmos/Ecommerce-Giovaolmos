import {  Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "src/entitites/orderDetails.entity";
import { Order } from "src/entitites/orders.entity";
import { Product } from "src/entitites/products.entity";
import { User } from "src/entitites/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ){}

    async addOrder(userId: string, products: any) {
        let total = 0;

        // Verificar que el usuario exista:
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`User with ID: ${userId} not found`);
        }

        // Verificar que todos los productos existan:
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id: element.id
                });
                if (!product) {
                    throw new NotFoundException(`Product with ID ${element.id} not found`);
                }
                return product;
            }),
        );

        // Calcular el monto total y actualizar el stock:
        try {
            for (const product of productsArray) {
                total += Number(product.price);
                await this.productsRepository.update(
                    { id: product.id },
                    { stock: product.stock - 1 }
                );
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante la actualización del stock
            throw new Error(`Error updating product stock: ${error.message}`);
        }

        // Creación de la orden:
        const order = new Order();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ordersRepository.save(order);

        // Creación de "OrderDetail" y la insertamos en la BBDD:
        const orderDetail = new OrderDetail();
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.orderDetailRepository.save(orderDetail);

        // Enviamos al cliente la compra con la info de productos
        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetail: true,
            },
        });
    }


    getOrder(id: string){
        const order = this.ordersRepository.findOne({
            where: {id},
            relations:{
                orderDetail:{
                    products: true,
                },
            },
        });

        if(!order){
            throw new NotFoundException( `Order with id: ${id} not found`);
        }
        return order;
    }
}