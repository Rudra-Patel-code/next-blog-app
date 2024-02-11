export const commonBlogAggregator = (): any => {
    return [
        {
            $lookup: {
                localField: "creator",
                foreignField: "_id",
                from: "users",
                as: "creator",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        { $addFields: { creator: { $first: "$creator" } } },
    ];
};
