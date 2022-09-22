module.exports = {

    // Formats date 
    format_date: (date) => {
        let formattedDate = new Date(date);
        return `${formattedDate.toLocaleDateString()}`;
    },

    // Function for Handlebars to determine equivalency of two arguments
    eq: (arg1, arg2) => {
        return arg1 === arg2;
    }
}