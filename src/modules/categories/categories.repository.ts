import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entitites/categories.entity";
import { Repository } from "typeorm";
import * as data from '../../utils/data.json'

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    async getCategories(){
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        data?.map(async(element) => {
            await this.categoriesRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({name: element.category})
            .orIgnore()
            .execute();
        });
        return 'categories added'
    }
}