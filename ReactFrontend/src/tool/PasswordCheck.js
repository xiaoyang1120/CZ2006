const isSimplePwd = (s) => {
    if (s.length < 6) {
        return true;
    }
    let ls = 0;
    if (s.match(/([a-z])+/)) {
        ls++;
    }
    if (s.match(/([0-9])+/)) {
        ls++;
    }
    if (s.match(/([A-Z])+/)) {
        ls++;
    }
    if (s.match(/[^a-zA-Z0-9]+/)) {
        ls++;
    }
    return ls < 3;
}

export default isSimplePwd