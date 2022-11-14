import { useEffect, useState } from 'react';

import { getData } from '../../../utils/Products';
import {IProduct} from "../../../types/Product";

export const useLine = (arrOptions: IProduct[]) => {

    const dayNow = getData();

    const [amountSoldProducts, setAmountSoldProducts] = useState<number[]>([]);

    useEffect(() => {
        const soldProductsToday = arrOptions.filter(product => product.lastSale === dayNow);

        if (soldProductsToday.length === 0) {
            return;
        }

        const data = soldProductsToday.map((product) => product.quantity * Number(product.price));
        const totalAmount = data.reduce((total, item) => total + item, 0);
        setAmountSoldProducts([0, ...data]);
    }, [arrOptions]);

    const options = {
        title: {
            text: 'Total earned',
            left: 'left',
            color: '#2B3844',
            top: '0px',
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: 'Inter',
            },
        },
        xAxis: {
            show: false,
            type: 'category',
            data: amountSoldProducts,
        },
        yAxis: {
            type: 'value',
            show: false
        },
        axisPointer: {
            show: false,
            type: 'none',
        },
        series: [
            {
                data: amountSoldProducts,
                type: 'line',
                color: '#1CAF7F'
            }
        ]
    };

    return {amountSoldProducts, options}
}