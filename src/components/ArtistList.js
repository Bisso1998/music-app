import { Component } from 'react'
import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col , Avatar, Skeleton, Spin, Tag} from 'antd';
import "../index.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ArtistDetails from './ArtistDetails';

const GET_ARTIST_LIST = gql`
query getData($query: String!) {
  search {
    artists(query: $query) {
      edges {
      
        node {
          theAudioDB {
            thumbnail
          }
          name
          spotify {
            images {
              url
              width
              height
            }
          }
          fanArt{
            thumbnails{
              url
            }
            backgrounds{
              url
            }
            banners{
              url
            }
          }
          country
          gender
          lastFM {
            name
            listenerCount
            url
            biography {
              summaryHTML
            }
            url
          }
        }
      }
    }
  }
}
`;

class ArtistList extends Component {
  constructor(props) {
		super(props)

		this.state = { 
      artists: null,
      artistSearchName: false
    }
  }
  // setArtistName(name) {
  //   console.log("setArtistName called");
  //   this.setState({
  //    artistSearchName : name
  //   })
  // }
  componentDidUpdate(prevProps, prevState){  
    console.log("I am here");
    console.log(prevProps.searchQuery + " " +this.props.searchQuery)
    if(prevProps.searchQuery!==this.props.searchQuery){
      console.log("C@---> ", this.props.searchQuery);
     if(this.props.searchQuery != null) {
        this.setState({
          artistSearchName : this.props.searchQuery
        })
        console.log("222222 " + this.state.artistSearchName);
     }
    }
 }

  onDogFetched = data => {
    console.log(data);
    this.setState(() => ({ artists: data }));
  }
   
  render() {
    return (
    <div style={{background: 'black', height: '100vh'}}>
  
       { this.state.artistSearchName &&
        <Query
        query={GET_ARTIST_LIST}
        variables={{ query: this.state.artistSearchName }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return (
            <Row>
              <Col span={5}>
              </Col>
              <Col span={14}>
              Loading...
              <Spin spinning={true } tip="Fetching your data..." style={{padding: '20px'}}>
                {/* <Skeleton active avatar title /> */}
                <div style={{width: '100%' , height: '130px'}}
                ></div>
                </Spin>
              </Col>
            </Row>
          )
          if (error) return (
            <div>            
            `Error!: ${error}`
            </div>
            );
    
          return (

            <div>
              <Row>
                <Col span={5}>

                </Col>
                <Col span={14}>
                <h2 style={{fontFamily: 'PingFang SC' , color: 'white', paddingTop: '20px'}}>Top Results for "{this.state.artistSearchName}"</h2>
                </Col>
              </Row>

                {data.search.artists.edges.map((eachArtist) => (
        (eachArtist.node.spotify && eachArtist.node.theAudioDB) &&
        <div key={eachArtist.node.mbid}>
    <Row style={{margin: '10px'}}>
      <Col span={5} >
      
      </Col>
      <Col span={14} >
<Router>
        <Link to="/artist-details/">

        <Row className="artist-container">
            <Col span={2} >
            <img style={{width: '100%' , borderRadius: '50%'}} src={eachArtist.node.spotify.images[2].url}/>
            </Col>
            <Col span={12}  className="artist-detail" >
            <p  style={{fontSize: '15px' , fontFamily: 'PingFang SC',  color: 'white'}}><b>{`${eachArtist.node.name} `}</b></p> 
            <p style={{fontSize: '12px',  fontFamily: 'PingFang SC',  color: '#AAAAAA'}}>Artist | <span>{`${eachArtist.node.country} `}</span></p> 

            </Col>
        </Row>
        </Link>
        <Route path="/artist-details/" exact component={ArtistDetails} />

        </Router>
      </Col>
      <Col span={5} >
      
      </Col>
      </Row>

{/*                
                {
                  <div>
                    <img src={eachArtist.node.spotify.images[2].url}/>
                   <img src={eachArtist.node.theAudioDB.thumbnail} />
                   <img src={eachArtist.node.fanArt.thumbnails[0].url} />
                   <img src={eachArtist.node.fanArt.backgrounds[0].url} />
                    <img src={eachArtist.node.fanArt.banners[0].url} />
                  </div>
                } */}
               </div>
    ))} 
            </div>
         
          );
        }}
      </Query>
       }
    </div>
    );
  }
}
export default ArtistList;



// <ApolloConsumer>
// {client => (
//   <div>
//     {!this.state.artists && 'LOADING...'}
    // {this.state.artists && this.state.artists.map((eachArtist) => (
    //     (eachArtist.node.spotify && eachArtist.node.theAudioDB) &&
    //     <div key={eachArtist.node.mbid}>
    //              <p>{`${eachArtist.node.name} from ${eachArtist.node.country}  ${eachArtist.node.gender}  `}
    //              </p>
    //             { eachArtist.node.spotify && 
    //               <div>
    //                  <img src={eachArtist.node.spotify.images[2].url}/>
    //                <img src={eachArtist.node.theAudioDB.thumbnail} />
    //                <img src={eachArtist.node.fanArt.thumbnails[0].url} />
    //                <img src={eachArtist.node.fanArt.backgrounds[1].url} />
    //                <img src={eachArtist.node.fanArt.banners[0].url} />
    //               </div>
    //             }
    //            </div>
    // ))}  
//     <button
//       onClick={async () => {
//         const { data } = await client.query({
//           query: GET_ARTIST_LIST,
//           variables: { query: this.state.artistSearchName }
//         });
//         this.onDogFetched(data.search.artists.edges);
//       }}
//     >
//       Click me!
//     </button>
//   </div>
// )}
// </ApolloConsumer>
