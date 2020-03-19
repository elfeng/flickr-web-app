import axios from 'axios';
import React, { Component } from 'react';
import PhotoList from './PhotoList';
import PhotoContainer from './PhotoContainer';
import { getSearchUrl, NB_MAX_PHOTOS_PER_PAGE } from './FlickrURLs.js';

export default class PhotoListContainer extends Component {

    constructor(props) {
        super(props);
        this.photoContainers = [];
        this.state = {
            searchResults: null,
            photoContainers: []
        };
        this.searchFlickr = this.searchFlickr.bind(this);
        this.showMorePhotos = this.showMorePhotos.bind(this);
    }

    componentDidMount() {
        const self = this;
        this.searchFlickr(this.props.search, this.props.month, this.props.year)
            .then(searchResponse => {
                self.setState({
                    searchResults: searchResponse.data.photos.photo
                });
                this.showMorePhotos();
            })
            .catch(searchError => console.log(searchError));
    }

    searchFlickr(search, month, year) {
        const searchUrl = getSearchUrl(search, month, year);
        return axios.get(searchUrl);
    }

    /**
     * @return {number} the index of the last photo that will be displayed after we add more photos.
     */
    getNextLastPhotoIndex() {
        const lastPhotoIndex = this.state.photoContainers.length;
        const nbPhotosRemaining = this.state.searchResults.length - lastPhotoIndex;
        if (nbPhotosRemaining > NB_MAX_PHOTOS_PER_PAGE) {
            return lastPhotoIndex + NB_MAX_PHOTOS_PER_PAGE;
        } else if (nbPhotosRemaining > 0) {
            return lastPhotoIndex + nbPhotosRemaining;
        } else {
            return lastPhotoIndex;
        }
    }

    buildNewPhotoContainers() {
        const lastPhotoIndex = this.getNextLastPhotoIndex();
        for (let i = this.state.photoContainers.length; i < lastPhotoIndex; i++) {
            const photo = this.state.searchResults[i];
            this.photoContainers.push(<PhotoContainer key={photo.id} photoId={photo.id} />)
        }
    }

    showMorePhotos() {
        if (this.state.searchResults !== null) {
            this.buildNewPhotoContainers();
            this.setState({
                photoContainers: this.photoContainers
            });
        }
    }

    render() {

        let componentToRender = null;
        if (this.state.searchResults !== null) {
            componentToRender =
                <PhotoList
                    nbSearchResults={this.state.searchResults.length}
                    photoContainers={this.state.photoContainers}
                    showMorePhotos={this.showMorePhotos}/>;
        }

        return (componentToRender);
    }

};
