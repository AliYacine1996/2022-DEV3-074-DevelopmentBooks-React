import React from "react";
type ImagesProps = {
    images: string [];
}
const bookImagesStyles = {
    display: "flex",
    gap: "12px"
}

class BookImages extends React.Component<ImagesProps, any> {
    render() {
        return (
            <div id="books-images" style={bookImagesStyles}>
            { this.props.images.map((url,index)=> {
                return (<div key={index}>
                   <img src={url}/>
               </div> )
            })}
            </div>);
    }

}

export default BookImages