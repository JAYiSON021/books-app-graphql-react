import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
{
    authors {
        name
        id
    }
}
`;

class AddBook extends Component {

    displayAuthors() {
        let data = this.props.data;
        if(data.loading) {
            return(<option disabled >Loading authors.</option>);
        } else {
            return data.authors.map(author => {
                return (<option value={author.id} key={ author.id }> {author.name} </option>)
            });
        }
    }
    
    render() {
        return (
            <form id="add-book">

                <div className="field">
                    <label>Book name:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        { this.displayAuthors() }
                    </select>
                </div>

                <button type="button" >+</button>

            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
