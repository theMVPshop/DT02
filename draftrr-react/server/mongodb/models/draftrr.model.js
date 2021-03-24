// module.exports = mongoose => {
//     const Draftrr = mongoose.model(
//         "draftrr",
//         mongoose.Schema(
//             {
//                 text: String,
//             },
//         )

//         schema.method("toJSON", function() {
//             const { __v, _id, ...object } = this.toObject();
//             object.id = _id;
//             return object;
//           });

//           const Tutorial = mongoose.model("tutorial", schema);
//           return Tutorial;
//     );

//     return Draftrr;
// };

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            text: String
        },
        { timestamps: false }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Draftrr = mongoose.model("draftrr", schema);
    return Draftrr;
};