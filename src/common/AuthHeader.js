//function check create account, create user
const headerAuthor = () => {
    const saveToken = localStorage.getItem('jwt');
    // console.log(saveToken);
    if (saveToken) {
        return {
            Authorization: `Bearer ${saveToken}`,
            'Content-Type': 'application/json'
        };
    } else return {};
};
export default headerAuthor;
