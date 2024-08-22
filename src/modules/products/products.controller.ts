import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    !page ?  page = '1' : page;
    !limit ? limit = '5' : limit;
    if(page && limit) return this.productsService.getProducts(Number(page), Number(limit));
  };

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('seeder')
  addProduct(){
    return this.productsService.addProduct();
  };

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id:string){
    return this.productsService.getProductById(id);
  };


  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() product: any){
    return this.productsService.updateProduct(id, product)
  };

}