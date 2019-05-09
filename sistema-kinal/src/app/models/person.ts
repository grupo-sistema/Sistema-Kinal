export class Person{
    constructor(
        public FirstName: String,
        public SecondName: String,
        public Surname: String,
        public SecondSurname: String,
        public MarriedSurname: String,
        public CivilStatus: String,
        public Date: String,
        public Religion: String,
        public Email: any[],
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
            public Specific: String,
        public telephone: Object,
            public Mobile: any[],
            public Phone: any[],
            public Other: any[]
    ){}
}