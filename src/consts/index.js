export const NAVBAR_LINKS = {
  project: {
    link: "project",
    label: "Project",
  },
  contact: {
    link: "contact",
    label: "Contact",
  },
  aboutMe: {
    link: "",
    label: "About Me",
  },
};

export const FILTER_FIELDS = {
  SORT_FIELDS: [
    { label: 'Created newest', value: "creation_date_newest" },
    { label: 'Created oldest', value: "creation_date_oldest" },
    { label: 'Completed newest', value: "completion_date_newest" },
    { label: 'Completed oldest', value: "completion_date_oldest" },
    { label: 'A - Z', value: "a-z" },
    { label: 'Z - A', value: "z-a" }
  ],
  FILTER_ACTIVE_DONE: [
    {label: 'Active', status: 'active'},
    {label: 'Done', status: 'done'},
    {label: 'All', status: ''},
  ],
  FILTER_DATE: [
    {label: 'Create LTE', name: 'create_lte'},
    {label: 'Create GTE', name: 'create_gte'},
    {label: 'Complite LTE', name: 'complete_lte'},
    {label: 'Complite LTE', name: 'complete_gte'}
  ]
}

// export const SORT_FIELDS = [
//   { label: 'Created newest', value: "creation_date_newest" },
//   { label: 'Created oldest', value: "creation_date_oldest" },
//   { label: 'Completed newest', value: "completion_date_newest" },
//   { label: 'Completed oldest', value: "completion_date_oldest" },
//   { label: 'A - Z', value: "a-z" },
//   { label: 'Z - A', value: "z-a" }
// ]

// export const FILTER_ACTIVE_DONE = [
//   {label: 'Active', status: 'active'},
//   {label: 'Done', status: 'done'},
//   {label: 'All', status: ''},
// ]

// export const FILTER_DATE = [
//   {label: 'Create LTE', name: 'create_lte'},
//   {label: 'Create GTE', name: 'create_gte'},
//   {label: 'Complite LTE', name: 'complete_lte'},
//   {label: 'Complite LTE', name: 'complete_gte'}
// ]

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;