export const imageValid = (image) => {

    if (image && !image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        return 'Please Select Valid Image';
    } 
    if (image.size > 5000000) {
        return 'Image can not be more than 5 mb';
    } 
   
}