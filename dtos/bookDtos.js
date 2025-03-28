class IssuedBook{
    _id;
    name;
    genre;
    publisher;
    issuedBy;
    issueDate;
    returnDate;

    constructor(user){
        this._id=user.issuedBook._id;
        this.name=user.issuedBook.name;
        this.genre=user.issuedBook.genre;
        this.publisher=user.issuedBook.publisher;
        this.issuedBy=user.issuedBy;
        this.issueDate=user.issueDate;
        this.returnDate=user.returnDate;
    }
}
module.exports=IssuedBook;

