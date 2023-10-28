export default {

    common: {
        logIn: "Log in",
        loggingIn: "Logging you in",
        back: "Back",
        cancel: "Cancel",
        close: "Close",
        submit: "Submit",
        save: 'Save',
        add: "Add",
        submitting: "Submitting",
        confirm: "Confirm",
        from: "From",
        to: "To",
        createdAt: "Created At",
        createdBy: "Created By",
        edit: 'Edit',
        delete: 'Delete'
    },

    topBar: {
        profile: "My Profile",
        logout: "Log out"
    },

    labels: {
        email: "Email",
        password: "Password",
        name: "Name",
        confirmPass: "Confirm Password",
    },

    fieldErrors: {
        email: {
            required: "Email required",
            invalid: "Invalid email format"
        },
        name: {
            short: "Name too short",
            required: "Name required"
        },
        password: {
            required: "Password required"
        }
    },

    forgotPass: {
        button: "Forgot Password",
        title: "Forgot your password?",
        text1: "Do not worry, just type in your email that is registered in the app.",
        text2: "Then you will receive an email with all the instructions.",
        fieldPlaceholder: "Type your email here",
        button1: "Recover password"
    },

    navBar: {
        home: "Home",
        addRecord: "Add Record",
        settings: "Settings"
    },

    homeScreen: {
        shortcuts: {
            1: "Add Record",
            2: "Groceries List",
            3: "View Activity",
            4: "View Balance"
        },
        activity: {
            title: "Recent Activity",
            button: "View more"
        }
    },

    activity: {
        title: "Activity",
        noRecords: "No more records to show",
        noData: "No data found",
        filterBtn: "Filter by date",
        clearFilterBtn: "Clear Filter"
    },

    addRecord: {
        title: "Use the following form to create a new record",
        fields: {
            value: {
                label: "Value",
                errors: {
                    required: "Value Required"
                }
            },
            category: {
                label: "Category",
                placeholder: "Select a category",
                errors: {
                    required: "Please pick a category"
                }
            },
            subcategory: {
                label: "Subcategory",
                placeholder1: "Select a subcategory",
                placeholder2: "Select a category first",
                errors: {
                    required: "Please pick a subcategory"
                }
            },
            paid: {
                label: "Paid By",
                placeholder: "Select a person",
                errors: {
                    required: "Please pick a person"
                }
            },
            date: {
                errors: {
                    required: "Please pick a date"
                }
            }
        },
    },

    groceries: {
        title: "Groceries List",
        cards: {
            menu: {
                open: "Open",
                edit: "Edit",
                delete: "Delete"
            }
        },
        list: {
            empty: "Your shopping list is empty, start by adding a new product by clicking on the button with a plus sign on the bottom right side.",
            add: {
                title: "Add item to list",
                inputs: {
                    product: {
                        label: "Product",
                        errors: {
                            required: "Product name is required"
                        }
                    },
                    quantity: {
                        label: "Qt.",
                        errors: {
                            required: "Quantity is required"
                        }
                    }
                }
            },
            edit: {
                title: "Edit item",
                inputs: {
                    product: {
                        label: "Product",
                        errors: {
                            required: "Product name is required"
                        }
                    },
                    quantity: {
                        label: "Qt.",
                        errors: {
                            required: "Quantity is required"
                        }
                    }
                }
            }
        }
    },

    balance: {
        title: "Balance History",
        noData: "No data found",
        filterBtn: "Filter by date",
        clearFilter: "Clear filter",
        cards: {
            closed: "Closed Balance",
            viewHistory: "View History",
            expensesHistory: "Expenses History",
            noExpenses: "No expenses to display",
            noInfo: "No info to display",
            division: {
                1: "has to pay",
                2: "€ to"
            },
            totalSpent: "Total spent",
            details: "Details",
            chart1: {
                title: "Amount spent by User"
            },
            chart2: {
                title: "Expenses by categories"
            },
            opened: "Current opened balance",
            openInfo: "Open Info",
            closeBalance: "Close Balance",
            today: "Today"
        }
    },

    profile: {
        changePortrait: "Change Portrait",
        addPortrait: "Add Portrait",
        removePortrait: "Remove Portrait",
        button: {
            edit: "Edit Profile",
            changePass: "Change Password"
        },
        editProfile: {
            title: "Use the following form to update your profile information",
            cannotChange: "You cannot change this value"
        },
        changePass: {
            title: "Use the following form to change your password",
            fields: {
                newPass: {
                    label: "New Password",
                    errors: {
                        required: "New password required",
                        invalid: "Password must have at least 8 characters and include, lower, upper case and numbers"
                    }
                },
                confirmPass: {
                    label: "Confirm New Password",
                    errors: {
                        required: "Confirm Password required",
                        match: "Passwords do not match"
                    }
                },
                authPass: {
                    label: "Your current Password",
                    errors: {
                        required: "Current Password required",
                    }
                }
            }
        }
    },

    settings: {
        general: {
            title: "General",
            items: {
                theme: "Theme",
                language: "Language",
            }
        },
        about: {
            title: "About",
            items: {
                about: "About"
            }
        }
    },

    records: {
        delete: {
            text: "Are you sure you want to remove this records?\nYou cannot undo this action.\n\nEvery member will receive an email informing about this action."
        },
    }
}