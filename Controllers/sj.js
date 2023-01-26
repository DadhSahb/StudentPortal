export const getAllEvents = async (req, res) => {
    const query = "SELECT * FROM events";
    pool.query(query, (err, row, field) => {
        if (err) { console.log(err) }
        if (row) {
            if (row.length === 0) {
                res.send({ data: [] })
                console.log('data sent')
            }
            else {
                row.forEach((value, index) => {
                    pool.query("SELECT * FROM comments WHERE eventId=?", [value.id], (error, rows, fields) => {
                        if (error) { console.log(err) }
                        if (rows) {
                            row[index].comment = rows
                            if (row.length === index + 1) {
                                row.reverse()
                                res.send({ data: row })
                            }
                        }
                    })
                })
            }
        }
    })
}


export const Resume = async (req, res) => {
    const { userId } = req.body;
    const query = "SELECT * FROM resume WHERE userId=?";
    pool.query(query, [userId], (err, row, field) => {
        if (err) {
            console.log(err);
        }
        if (row) {

            if (row.length === 0) {
                res.send({ data: [] })
                console.log('data sent')
            }
            else {
                const educationQuery = "SELECT * FROM resumeeducation where resumeId=?";
                const experienceQuery = "SELECT * FROM resumeexperience where resumeId=?";
                const rewardQuery = "SELECT * FROM resumereward where resumeId=?";

                row.forEach((value, index) => {
                    pool.query(educationQuery, [value.id], (error, rows, fields) => {
                        if (error) { console.log(error) }
                        if (rows) {
                            row[index].education = rows
                            if (row.length === index + 1) {
                                row.forEach((value2, index2) => {
                                    pool.query(educationQuery, [value2.id], (error2, rows2, fields2) => {
                                        if (error2) { console.log(error2) }
                                        if (rows2) {
                                            row[index2].experience = rows2
                                            if (row.length === index + 1 && row.length === index2 + 1) {
                                                row.forEach((value3, index3) => {
                                                    pool.query(rewardQuery, [value3.id], (error3, rows3, fields3) => {
                                                        if (error3) { console.log(error3) }
                                                        if (rows3) {
                                                            row[index3].education = rows3
                                                            if (row.length === index3 + 1 && row.length === index + 1 && row.length === index2 + 1) {
                                                                row.reverse()
                                                                res.send({ data: row })
                                                            }
                                                        }
                                                    })
                                                })
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    })
                })

            }
        }
    });
};
