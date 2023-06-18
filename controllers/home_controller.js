
module.exports.home = async function (req, res) {
    try {
        return res.render('home', {
            title: " | Home",
        });
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};