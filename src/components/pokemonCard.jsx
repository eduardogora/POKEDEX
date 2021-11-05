import React, {Component} from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Card, Row, Col } from 'antd';

import axios from "axios";

const { Meta } = Card;

class PokemonCard extends Component {
    state = {
        name: this.props.name,
        id: 0, 
        image: "",
        url: this.props.url,
        type: "",
        cardColor: "",
      };

      getPokemonInfo = async () => {
        await axios
        .get( this.props.url)
        .then((res) => {
            const  result = res.data;
            let imageURL = result.sprites.other["official-artwork"];
            this.setState({image: imageURL.front_default, id: result.id, type: result.types[0].type.name})
      });
    }

      async componentDidMount(){
        await this.getPokemonInfo();
      }
    
      onChange = page => {
        this.setState({
          current: page,
        });
      };

      handlePokemonClick = async () =>{
        await this.props.onPokemonClick(this.state.name, this.state.url);
      }
    
      render() {
        return (
            <div>
                <div onClick={ this.handlePokemonClick}>
                    <Card 
                    style={{ width: "100%", backgroundColor: this.props.getCardColor(this.state.type) }}
                    cover={
                        <img src= {this.state.image} style={{width: "100%" }} align="center"></img>
                    }
                    hoverable
                >
                    <Meta
                    title= {this.state.name}
                    description= {"#" + this.state.id}
                    />
                    </Card>
                </div>
            </div>
        );
      }
  }
  
  export default PokemonCard;