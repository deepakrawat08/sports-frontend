export const isPlayerAllowed = (user) => {
    const participate = user.participate;
    if (participate.length < 2) {
        return true
    } else {
        return false
    }
};