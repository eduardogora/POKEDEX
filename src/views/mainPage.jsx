import Navbar from "../components/navbar";
import PokemonCard from "../components/pokemonCard";
import PokemonPage from "./pokemonPage";
import axios from "axios";

import React, { Component } from "react";
import { Pagination, Row, Col, Empty } from 'antd';


class Mainpage extends Component {
    state = {
        pokemons: [],
        renderedPokemon: [],
        statePokemons: [],
        currentPage: 1,
        pageSize: 20,
        initalPokemon: 0,
        lastPokemon: 0,
        pokemonSearch: "",

        pokemonPageActive: false,
        activePokemon: "",
        activePokemonUrl: "",
    }

    //Handle page change
    onPageChange = async (page, pageSize) => {
        await this.setState({
          currentPage: page,
          pageSize,
        });
        await this.getPokemonsToShow();
    }

    //Makes the pagination change of rendered pokemons
    onShowSizeChange = async (page, pageSize) =>{
    }

    //Get the information of all pokemon
    getAllPokemon = async () => {
        const params = new URLSearchParams([["limit", 1118]]);
        await axios
        .get(`https://pokeapi.co/api/v2/pokemon/`, { params })
        .then((res) => {
            const { results } = res.data;
            this.setState({pokemons: results})
      });
    }

    async componentDidMount(){
        await this.getAllPokemon();
        this.getPokemonsToShow();
    }

    //Get rendered pokemons
    getPokemonsToShow =  async() => {
         let initialPokemon = (this.state.currentPage - 1) * this.state.pageSize;
         let lastPokemon = initialPokemon + this.state.pageSize;
         let newRender = [];
         let newPokemon = [];
         let currentPage = 1;

         for(let i = 0; i < 1118; i++){
             if(this.state.pokemons[i].name.includes(this.state.pokemonSearch)){
                 newPokemon.push(this.state.pokemons[i])
             };
         }
         
         if(this.state.pokemonSearch !== ""){
            for(let i = initialPokemon; i < lastPokemon; i++){
                newRender.push(newPokemon[i]);
             }
         }else{
            for(let i = initialPokemon; i < lastPokemon; i++){
               newRender.push(this.state.pokemons[i]);
            }
         }

         var filtered = newRender.filter(x => {
            return x !== undefined;
            });

        let totalPages = (newPokemon.length / this.state.pageSize);
        if (this.state.currentPage > totalPages){
            currentPage = 1;
        }else{
            currentPage = this.state.currentPage;
        }

         await this.setState({initialPokemon, lastPokemon, renderedPokemon: filtered, statePokemons: newPokemon, currentPage });
    }

    //Allow the search method to work
    onSearch = async (value) => {
        await this.setState({pokemonSearch: value.target.value})
        await this.getPokemonsToShow();
    }

    //Handle pokemon click
    onPokemonClick = async(pokemon, url) =>{
        await this.setState({activePokemon: pokemon, activePokemonUrl: url, pokemonPageActive: true});
    }

    //Handle home click button
    handleHomeClick = () =>{
        this.setState({pokemonPageActive: false})
    }

    //Changes active pokemon to the next one
    nextPokemon = async(name) =>{
        let index = 0;
        for(let i = 0; i < this.state.statePokemons.length; i++){
            if(name === this.state.statePokemons[i].name){
                index = i;
            }
        }
        if(index === this.state.statePokemons.length -1){
            index = 0;
        }else{
            index += 1;
        }
        await this.setState({activePokemon: this.state.statePokemons[index].name, activePokemonUrl: this.state.statePokemons[index].url,});
    }

    //Change active pokemon to the previous one 
    previousPokemon = async(name) =>{
        let index = 0;
        for(let i = 0; i < this.state.statePokemons.length; i++){
            if(name === this.state.statePokemons[i].name){
                index = i;
            }
        }
        if(index === 0){
            index = this.state.statePokemons.length - 1;
        }else{
            index -= 1;
        }
        await this.setState({activePokemon: this.state.statePokemons[index].name, activePokemonUrl: this.state.statePokemons[index].url,});
    }

    //Obtain the card color
    getCardColor = (name) => {
        let color = "";

        switch(name){
            case "bug":
                color = "#D7FF77";
                break;
            case "fire":
                color = "#FE3700";
                break;
            case "normal":
                color = "#DACFCC";
                break;
            case "dark":
                color = "#5F5D5D";
                break;
            case "flying":
                color = "#B2F8FA";
                break;
            case "poison":
                color = "#A100FF";
                break;
            case "dragon":
                color = "#00C5D6";
                break;
            case "ghost":
                color = "#AA70DB";
                break;
            case "psychic":
                color = "#EB2EDA";
                break;
            case "electric":
                color = "#EBFA00";
                break;
            case "grass":
                color = "#27D300";
                break;
            case "rock":
                color = "#B25500";
                break;
            case "fairy":
                color = "#FF08E8";
                break;
            case "ground":
                color = "#E76E00";
                break;
            case "steel":
                color = "#C2C3BC";
                break;
            case "fighting":
                color = "#FFA500";
                break;
            case "ice":
                color = "#67CAD6";
                break;
            case "water":
                color = "#006EFF";
                break;
            default:
                break;
        }
        return color;
      }

  render() {
    return (
        <div >
        {!this.state.pokemonPageActive 
            ? 
            <div >
                <Navbar
                    onSearch = {this.onSearch}
                    getPokemonsToShow = {this.getPokemonsToShow}
                    isPokemonPage = {this.state.pokemonPageActive}
                >
                </Navbar>
                <Row style={{padding: "50px", backgroundColor: "#3B4CCA"}}>
                    {this.state.renderedPokemon.map((pokemon) => (
                        <Col span={6}>
                            <PokemonCard
                            key = {pokemon.name}
                            name = {pokemon.name}
                            url = {pokemon.url}
                            onPokemonClick = {this.onPokemonClick}
                            getCardColor = {this.getCardColor}
                            >
                            </PokemonCard>
                        </Col>
                    ))}
                </Row>
                {this.state.renderedPokemon.length === 0
                ?
                <Empty style={{backgroundColor: "#3B4CCA"}}></Empty>
                :
                null
                }
                <Pagination 
                style={{padding: "20px", backgroundColor: "#3B4CCA"}}
                current={this.state.currentPage} 
                onChange={this.onPageChange} 
                total={this.state.statePokemons.length}
                pageSize={this.state.pageSize} 
                />
            </div>
            : 
            <div>
                <Navbar
                    onSearch = {this.onSearch}
                    getPokemonsToShow = {this.getPokemonsToShow}
                    isPokemonPage = {this.state.pokemonPageActive}
                    handleHomeClick = {this.handleHomeClick}
                    />
                <PokemonPage
                key = {this.state.activePokemon}
                name = {this.state.activePokemon}
                url = {this.state.activePokemonUrl}
                nextPokemon = {this.nextPokemon}
                previousPokemon = {this.previousPokemon}
                getCardColor = {this.getCardColor}
                >
                </PokemonPage>
            </div>
        }
        </div>
    );
  }
}

export default Mainpage;