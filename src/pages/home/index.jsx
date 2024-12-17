import { useContext } from "react"
import { GlobalContext } from '../../context';
import RecipeItem from "../../components/recipe-item";

export default function Home() {
    const { recipeList, loading, handlerandomrecipeList } = useContext(GlobalContext)

    if (loading) return <div> Loading ... Please wait!!</div>
    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 ">
        {
            recipeList && recipeList.length > 0 ?
                recipeList.map((item) => <RecipeItem item={item} />)
                : <div className="flex flex-col gap-8  justify-center">
                    <p
                        className="lg:text-4xl text-xl text-center text-black font-extrabold"
                    >Nothing to show . Please search for somthine </p>

                    <button onClick={() => handlerandomrecipeList()} className=" p-3 px-8 rounded-lg text-sm uppercase  font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white "> Random </button>
                    <div>
                        {!loading && "Click on random to genertae "}
                    </div>

                </div>

        }

    </div>
}
