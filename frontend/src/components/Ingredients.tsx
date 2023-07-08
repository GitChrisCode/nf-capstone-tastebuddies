import React from 'react';
import {TrashIcon} from "@heroicons/react/24/solid";



type IngredientsListProps = {
    ingredients: string[];
    onIngredientRemove: (value: string) => void;
    title: string;
};

const IngredientsList: React.FC<IngredientsListProps> = ({
                                                             ingredients,
                                                             onIngredientRemove,
                                                             title,
                                                         }) => {
    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div
                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">
                                    {title}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Ingredient
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>

                            </tr>
                            </thead>
                            <tbody>
                            {ingredients.map((ingredient) => (
                                <tr>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        {ingredient}
                                    </th>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        <button onClick={() => onIngredientRemove(ingredient)}>
                                            <TrashIcon className="h-5 w-5 ml-10"
                                                       color="black"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
   /*<div className="block w-full overflow-x-auto">

            <Card>
                <Typography
                    className="ml-2 mb-1 bg-gray-200 border-gray-300 rounded-[7px] divide-solid divide-blue-400">
                    {title}
                </Typography>
                <CardBody key={uuidv4()} className="">
                    {ingredients.map((ingredient) => (
                        <Typography size="lg" className="-ml-10 justify-center items-center">
                            <button onClick={() => onIngredientRemove(ingredient)}>
                                <TrashIcon className="h-5 w-5 ml-10"
                                           color="black"/>
                            </button>
                            {ingredient}
                        </Typography>
                    ))}
                </CardBody>

            </Card>
        </div>*/

    );
}
export default IngredientsList;
