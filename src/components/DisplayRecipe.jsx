import {useState, useEffect} from 'react';

function DisplayRecipe(props){
    const [currentImage, setCurrentImage] = useState("");
    const [currentRecipe, setCurrentRecipe] = useState("");


    useEffect(() => {
    fetch('/joke').then(res => res.json()).then(data => {
        console.log(data.recipes[0]);
        var recipe = data.recipes[0].title;
        setCurrentRecipe(recipe);
        setCurrentImage(data.recipes[0].image)
    });
    }, [])

    return (
        <>
        <p>Today's recipe: {currentRecipe}</p>
        <img src={currentImage} alt="Food" width="128" height="128"></img>
        </>
    );

}

export default DisplayRecipe;