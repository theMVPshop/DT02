module.exports = mongoose => {
    const Draftrr = mongoose.model(
        "draftrr",
        mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean
            },
            { timestamps: true }
        )
    );

    return Draftrr;
};