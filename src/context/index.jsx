import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [searchParam, setsearchParam] = useState("")
    const [loading, setloading] = useState(false)
    const [recipeList, setrecipelist] = useState([])
    const [recipeDetailsData, setrecipeDetailsData] = useState(null)
    const [favoritesList, setfavoritesList] = useState([])


    function handlesearchParam() {
        setrecipelist({})
        setloading(false)
        setsearchParam("")
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await res.json();
            if (data?.data?.recipes) {
                setrecipelist(data?.data?.recipes)
                setloading(false)
                setsearchParam("")
            }

            console.log(data)
        } catch (e) {
            console.log(e);
            setloading(false)
            setsearchParam("")

        }

    }

    function handlefavoritesList(getCurrentItem) {
        console.log(getCurrentItem)
        let cpyFavoritesList = [...favoritesList]
        const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id)

        if (index === -1) {
            cpyFavoritesList.push(getCurrentItem)
        } else {
            cpyFavoritesList.splice(index)
        }

        setfavoritesList(cpyFavoritesList)
        console.log(cpyFavoritesList, "hav lo")

    }

    console.log(loading, recipeList)
    return <GlobalContext.Provider value={{ searchParam, loading, recipeList, setsearchParam, handleSubmit, handlesearchParam, recipeDetailsData, setrecipeDetailsData, handlefavoritesList, favoritesList }}>{children}</GlobalContext.Provider>
}