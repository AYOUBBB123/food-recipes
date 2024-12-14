import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context"


export default function Details() {

    const { id } = useParams()
    const { recipeDetailsData, setrecipeDetailsData, favoritesList, handlefavoritesList } = useContext(GlobalContext)

    useEffect(() => {
        async function getRecipeDetails() {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
            const data = await response.json();
            console.log(data);
            if (data?.data) {
                setrecipeDetailsData(data?.data)
            }


        }
        getRecipeDetails()

    }, [])
    return <div className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
        <div className="row-start-2 lg:row-start-auto">
            <div className="h-96 overflow-hidden rounded-xl group">
                <img src={recipeDetailsData?.recipe?.image_url} className="w-full h-full object-cover block  group-hover:scale-105 duration-300" alt="" />

            </div>

        </div>

        <div className="flex flex-col gap-3">
            <span className="text-sm text-cyan-700 font-medium">
                {recipeDetailsData?.recipe?.publisher}
            </span>
            <h3 className="font-bold text-2xl truncate text-black">
                {recipeDetailsData?.recipe?.title}
            </h3>

            <div>
                <button onClick={() => handlefavoritesList(recipeDetailsData?.recipe)} className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white "> {favoritesList && favoritesList.length > 0 && favoritesList.findIndex(
                    (item) => item.id === recipeDetailsData?.recipe?.id
                ) !== -1
                    ? "Remove from favorites"
                    : "Add to favorites"} </button>
            </div>


            <div>
                <span className="text-2xl font-semibold text-cyan-800 text-center ml-2 ">
                    Ingredients: <hr className="h-2 w-2" />
                </span>
                <ul className="flex flex-col gap-3">
                    {recipeDetailsData?.recipe?.ingredients.map((ingredient) => (
                        <li>
                            <span className="text-2xl font-semibold text-black">
                                {ingredient.quantity}   {ingredient.unit}   <span>   </span>
                            </span>
                            <span className="text-2xl font-semibold text-black">
                                {ingredient.description}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    </div>
}
