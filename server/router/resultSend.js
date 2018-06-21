module.exports =  function (res, m = "", d) {
    let data = {
        message: m
    };
    if (typeof d === "number")
        data = { ...data, status: d }
    else
        data = { ...data, status: 0, detail: d }
    res.json(data);
}