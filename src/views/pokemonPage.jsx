import React, {Component} from "react";
import { Card, Row, Col, Progress, Badge, Collapse, Button, Tooltip, } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import axios from "axios";

const { Meta } = Card;
const { Panel } = Collapse;

class PokemonPage extends Component {
    state = {
        name: this.props.name,
        id: 0, 
        image: "",
        url: this.props.url,

        types: [],
        experience: 0,
        weight: 0,
        height: 0,
        moves: [],
        abilities: [],
        stats: [],

        cardColor: "",
      };

      getPokemonInfo = async () => {
        await axios
        .get( this.props.url)
        .then((res) => {
            const  result = res.data;
            let imageURL = result.sprites.other["official-artwork"];
            let types = result.types;
            let experience = result.base_experience;
            let weight= result.weight;
            let height= result.height;
            let moves= result.moves;
            let abilities= result.abilities;
            let stats= result.stats;

        
            this.setState({image: imageURL.front_default, id: result.id, types, experience, weight, height, moves, abilities, stats})
      });
    }
    
    getStatValue = (name, value) =>{
        let exit = 0;
        switch(name){
            case "hp":
                exit = Math.ceil((value*100)/255);
                break
            case "attack":
                exit = Math.ceil((value*100)/210);
                break
            case "defense":
                exit = Math.ceil((value*100)/230);
                break
            case "special-attack":
                exit = Math.ceil((value*100)/180);
                break
            case "special-defense":
                exit = Math.ceil((value*100)/230);
                break
            case "speed":
                exit = Math.ceil((value*100)/232);
                break
            default:
                break;
        }
        return exit;
    }

    getTypeColor = (name) => {
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

      async componentDidMount(){
        await this.getPokemonInfo();
        let cardColor = this.props.getCardColor(this.state.types[0].type.name);
        await this.setState({cardColor});
      }
    
      onChange = page => {
        this.setState({
          current: page,
        });
      };
    
      render() {
        return (
            <div>
                <Row style={{backgroundColor: "#3B4CCA"}}>
                    <Col span={6}></Col> 
                    <Col span={12}>
                        <div onClick={this.props.onPokemonClick} style={{ margin: "%"}}>
                        {console.log(this.state.cardColor, "cardColor")}
                            <Card
                            style={{ width: "100%", backgroundColor: this.state.cardColor }}
                            cover={
                                <img src= {this.state.image} style={{width: "100%" }} align="center"></img>
                            }
                        >
                            <Meta
                            title= {this.state.name}
                            description= {"#" + this.state.id}
                            />
                            {this.state.types.map((type) => (
                                <Badge  count={type.type.name} style={{backgroundColor: this.getTypeColor(type.type.name)}}/>
                            ))}
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row style={{backgroundColor: "#3B4CCA"}}>
                    <Col span={6}></Col> 
                    <Col span={12}>
                        <div onClick={this.props.onPokemonClick} style={{ margin: "%"}}>
                            <Card
                            style={{ width: "100%" ,backgroundColor: this.state.cardColor}}
                            >
                                {this.state.stats.map((stat) => (
                                    <Row>
                                    <Col span={6}>
                                        {stat.stat.name}
                                    </Col> 
                                    <Col span={18}>
                                        <Progress percent={this.getStatValue(stat.stat.name,stat.base_stat)} />
                                    </Col>
                                    </Row>   
                                ))}
                                    <Row>
                                        <Col span={8}>{"Weight: " + this.state.weight /10 +" kg"}</Col>
                                        <Col span={8}>{"Height: " + this.state.height /10 + "M"}</Col>
                                        <Col span={8}>{"Exp: " + this.state.experience}</Col>
                                    </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row style={{backgroundColor: "#3B4CCA"}}>
                    <Col span={6}></Col> 
                    <Col span={12}>
                        <div>
                            <Card
                            style={{ width: "100%", backgroundColor: this.state.cardColor }}
                            >
                            <Collapse>
                                <Panel header="Moves" key="1">
                                    <Row>
                                    {this.state.moves.map((move) => (
                                        <Col span={8}>
                                            <ol>{move.move.name}</ol>
                                        </Col>
                                    ))}
                                    </Row>
                                </Panel>
                                <Panel header="Abilities" key="2">
                                    <Row>
                                    {this.state.abilities.map((ability) => (
                                        <Col span={8}>
                                            <ol>{ability.ability.name}</ol>
                                        </Col>
                                    ))}
                                    </Row>
                                </Panel>
                          </Collapse>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row style={{backgroundColor: "#3B4CCA"}}>
                   <Col span={11}>
                   </Col>
                   <Col span={1}>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<LeftOutlined />} onClick={() => this.props.previousPokemon(this.state.name)}/>
                    </Tooltip>
                   </Col>
                   <Col span={1}>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<RightOutlined />} onClick={() => this.props.nextPokemon(this.state.name)} />
                    </Tooltip>
                   </Col>
                </Row>
            </div>
        );
      }
  }
  
  export default PokemonPage;