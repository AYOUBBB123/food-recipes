import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const items = [
        "carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", "green pepper",
        "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper", "tomato",
        "beetroot", "brussel sprouts", "peas", "zucchini", "radish", "sweet potato",
        "artichoke", "leek", "cabbage", "celery", "chili", "garlic", "basil", "coriander",
        "parsley", "dill", "rosemary", "oregano", "cinnamon", "saffron", "green bean",
        "bean", "chickpea", "lentil", "apple", "apricot", "avocado", "banana",
        "blackberry", "blackcurrant", "blueberry", "boysenberry", "cherry", "coconut",
        "fig", "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee", "mandarin",
        "mango", "melon", "nectarine", "orange", "papaya", "passion fruit", "peach",
        "pear", "pineapple", "plum", "pomegranate", "quince", "raspberry", "strawberry",
        "watermelon", "salad", "pizza", "pasta", "popcorn", "lobster", "steak", "bbq",
        "pudding", "hamburger", "pie", "cake", "sausage", "tacos", "kebab", "poutine",
        "seafood", "chips", "fries", "masala", "paella", "som tam", "chicken", "toast",
        "marzipan", "tofu", "ketchup", "hummus", "chili", "maple syrup", "parma ham",
        "fajitas", "champ", "lasagna", "poke", "chocolate", "croissant", "arepas",
        "bunny chow", "pierogi", "donuts", "rendang", "sushi", "ice cream", "duck",
        "curry", "beef", "goat", "lamb", "turkey", "pork", "fish", "crab", "bacon",
        "ham", "pepperoni", "salami", "ribs"
    ];

    const [searchParam, setsearchParam] = useState("")
    const [loading, setloading] = useState(false)
    const [recipeList, setrecipelist] = useState([])
    const [recipeDetailsData, setrecipeDetailsData] = useState(null)
    const [favoritesList, setfavoritesList] = useState([])

    async function handlerandomrecipeList() {
        const randomElement = items[Math.floor(Math.random() * items.length)];
        console.log(randomElement);

        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${randomElement}`)
            const data = await res.json();
            if (data?.data?.recipes) {
                setrecipelist(data?.data?.recipes)
                setloading(false)
                setsearchParam("")
            }


        } catch (e) {
            console.log(e);
            setloading(false)
            setsearchParam("")
        }
    }
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
    return <GlobalContext.Provider value={{ searchParam, loading, recipeList, setsearchParam, handleSubmit, handlesearchParam, recipeDetailsData, setrecipeDetailsData, handlefavoritesList, favoritesList, handlerandomrecipeList }}>{children}</GlobalContext.Provider>
}
