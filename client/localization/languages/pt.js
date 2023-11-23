export default {

    common: {
        logIn: "Entrar",
        loggingIn: "A entrar",
        back: "Voltar",
        cancel: "Cancelar",
        close: "Fechar",
        submit: "Submeter",
        continue: "Continuar",
        submitting: "A submeter",
        save: 'Guardar',
        add: "Adicionar",
        confirm: "Confirmar",
        from: "De",
        to: "Até",
        createdAt: "Criado em",
        createdBy: "Criado por",
        edit: 'Editar',
        delete: 'Eliminar',
        yes: "Sim",
        no: "Não"
    },

    topBar: {
        profile: "O meu perfil",
        logout: "Sair"
    },

    labels: {
        email: "Email",
        password: "Palavra Passe",
        name: "Nome",
        confirmPass: "Confirme Palavra passe",
    },

    fieldErrors: {
        email: {
            required: "Email é obrigatório",
            invalid: "Email não é válido"
        },
        name: {
            short: "Nome muito curto",
            required: "Name é obrigatório"
        },
        password: {
            required: "Palavra passe é obrigatória"
        }
    },

    forgotPass: {
        button: "Esqueci-me da palavra passe",
        title: "Esqueceu-se da sua palavra passe?",
        text1: "Não se preocupe, basta submeter o email registado na aplicação.",
        text2: "Após isso irá receber as todas as instruções no seu email",
        fieldPlaceholder: "O seu email aqui",
        button1: "Recuperar palavra passe"
    },

    navBar: {
        home: "Home",
        addRecord: "Adicionar despesa",
        settings: "Definições"
    },

    homeScreen: {
        shortcuts: {
            1: "Adicionar Despesa",
            2: "Lista de Compras",
            3: "Ver Atividade",
            4: "Ver Balanço"
        },
        activity: {
            title: "Atividade Recente",
            button: "Ver mais"
        }
    },

    activity: {
        title: "Atividade",
        noRecords: "Sem mais dados para mostrar",
        noData: "Sem resultados",
        filterBtn: "Filtrar por data",
        clearFilterBtn: "Apagar Filtros"
    },

    addRecord: {
        title: "Utilize o formulário a baixo para introduzir uma nova despesa",
        fields: {
            value: {
                label: "Valor",
                errors: {
                    required: "Valor Obrigatório"
                }
            },
            category: {
                label: "Categoria",
                placeholder: "Selecione uma categoria",
                errors: {
                    required: "Escolha uma categoria"
                }
            },
            subcategory: {
                label: "Sub-categoria",
                placeholder1: "Selecione uma sub-categoria",
                placeholder2: "Selecione uma categoria primeiro",
                errors: {
                    required: "Escolha uma sub-categoria"
                }
            },
            paid: {
                label: "Pago por",
                placeholder: "Selecione uma pessoa",
                errors: {
                    required: "Escolha uma pessoa"
                }
            },
            date: {
                errors: {
                    required: "Selecione uma data"
                }
            }
        },
    },

    groceries: {
        title: "Lista de compras",
        cards: {
            menu: {
                open: "Abrir",
                edit: "Editar",
                delete: "Eliminar"
            }
        },
        list: {
            emptyViewMode: "A sua lista está vazia, primeiro clique no botão a baixo para pode começar a editar a lista e em seguida para adicionar produtos basta clicar no botão com o simbolo + na canto inferior direito.",
            emptyEditMode: "A sua lista está vazia, comece por adicionar produtos ao clicar no botão com o simbolo + na canto inferior direito.",
            add: {
                title: "Adicionar item à lista",
                inputs: {
                    product: {
                        label: "Produto",
                        errors: {
                            required: "Nome do produto é obrigatório"
                        }
                    },
                    quantity: {
                        label: "Qtd.",
                        errors: {
                            required: "Indique uma quantidade"
                        }
                    }
                }
            },
            edit: {
                title: "Editar item",
                inputs: {
                    product: {
                        label: "Produto",
                        errors: {
                            required: "Nome do produto é obrigatório"
                        }
                    },
                    quantity: {
                        label: "Qtd.",
                        errors: {
                            required: "Indique uma quantidade"
                        }
                    }
                }
            }
        }
    },

    balance: {
        title: "Histórico do balanço",
        noData: "Sem data",
        filterBtn: "Filtrar por data",
        clearFilter: "Limpar filtros",
        cards: {
            closed: "Balanço fechado",
            viewHistory: "Ver histórico",
            expensesHistory: "Histórico de despesas",
            noExpenses: "Sem despesas para apresentar",
            noInfo: "Sem informação a apresentar",
            division: {
                1: "tem de pagar",
                2: "€ a"
            },
            totalSpent: "Total gasto",
            details: "Detalhes",
            chart1: {
                title: "Total gasto por user"
            },
            chart2: {
                title: "Despesas por categoria"
            },
            opened: "Balanço aberto",
            openInfo: "Ver info",
            closeBalance: "Fechar Balanço",
            today: "Hoje"
        }
    },

    profile: {
        changePortrait: "Alterar Foto",
        addPortrait: "Adicionar Foto",
        removePortrait: "Remover Foto",
        button: {
            edit: "Editar Perfil",
            changePass: "Alterar Palavra passe"
        },
        editProfile: {
            title: "Utilize o formulário a baixo para editar o seu perfil",
            cannotChange: "Não pode alterar este valor"
        },
        changePass: {
            title: "Use o formulário a baixo para alterar a sua palavra passe",
            fields: {
                newPass: {
                    label: "Nova palavra passe",
                    errors: {
                        required: "Nova palavra passe é obrigatória",
                        invalid: "Palavras passe tem de ter no minimo 8 caracteres incluindo minusculas, maiusculas e números"
                    }
                },
                confirmPass: {
                    label: "Confirme a nova palavra passe",
                    errors: {
                        required: "Campo obrigatório",
                        match: "Palavras passe não coincidem"
                    }
                },
                authPass: {
                    label: "Palavra passe atual",
                    errors: {
                        required: "Campo obrigatório",
                    }
                }
            }
        }
    },

    settings: {
        general: {
            title: "Geral",
            items: {
                theme: "Tema",
                language: "Língua",
            }
        },
        about: {
            title: "Sobre",
            items: {
                about: "Sobre"
            }
        }
    },

    records: {
        delete: {
            text: "Tem a certeza que pretende eliminar esta despesa?\nNão poderá reverter esta ação.\n\nTodos os utilizadores irão receber um email a avisar desta ação."
        },
        edit: {
            text: "Ao alterar a info desta despesa todos os utilizadores serão informados por email.\n\nPretende continuar?",
        }
    }
}