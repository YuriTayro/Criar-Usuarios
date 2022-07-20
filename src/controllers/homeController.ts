import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { resourceLimits } from 'worker_threads';
import { sequelize } from '../instances/mysql' //Necessário para teste do MySQL

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response)=>{
    
 let results = await User.findAll({
    where: {
        name: 'Ciclano'
    }
 });

 if(results.length > 0){
    let usuario = results[0];
    await usuario.destroy();
 }


    let users = await User.findAll();
    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const novoUsuario = async (req: Request, res: Response) => {
    let { name, age } = req.body;

    if(name) {
        const newUser = User.build({ name });

        if(age) {
            newUser.age = parseInt(age);
        }

        await newUser.save();
    }

    res.redirect('/');
}