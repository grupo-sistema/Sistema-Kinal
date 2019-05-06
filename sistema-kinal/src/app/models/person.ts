export class Person{
    constructor(
        public FirstName: String,
        public SecondName: String,
        public Surname: String,
        public SecondSurname: String,
        public Date: String,
        public Religion: String,
        public Email: [],
        public Gender: String,
        public Address: Object,
            public Departament: String,
            public Municipality:  String,
            public Zone: String,
            public Colony: String,
            public Avenue: String,
            public Street: String,
            public Block: String,
            public HouseNumber: String,
        public telephone: Object,
            public Mobile: String,
            public Phone: String,
            public Other: String
    ){}
}