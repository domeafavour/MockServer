var numbers = require('./src/dictionary/numbers')
module.exports = {
  data: {
    users: {
      type: Array,
      size: 10, // default: 10
      construct: {
        name: {
          type: String,
          field: 'name'
        },
        age: {
          type: Number,
          field: 'age',
          range: '[23-45]',
          formatter: function (age) {
          	return age + '岁'
          }
        },
        girlFriend: {
          type: Object,
          formatter: function (gf) {
          	gf.isReal = gf.age > 23
          	return gf
          },
          construct: {
            name: {
              type: String,
              field: 'name'
            },
            age: {
              type: Number,
              field: 'age',
		          range: '[20-25]'
            }
          }
        },
        contacts: {
          type: Array,
          size: 2,
          construct: {
          	name: {
          		type: String,
          		field: 'name'
          	},
            mobile: {
              type: String,
              field: 'mobile'
            },
            email: {
              type: String,
              field: 'email'
            }
          }
        }
      }
    },
    products: {
      type: Array,
      size: 5,
      construct: {
        id: {
          type: Number,
          field: 'id',
          length: 7
        },
        name: {
          type: String,
          field: 'name'
        },
        price: {
          type: Number,
          field: 'price',
          fixed: 2
        },
        brand: {
          type: String,
          field: 'brand'
        }
      }
    },
    'home/about': {
    	type: Object,
    	construct: {
    		title: {
    			type: String,
    			formatter: function () {
    				return 'About'
    			}
    		},
    		url: {
    			type: String,
    			field: 'url'
    		}
    	}
    }
  },
  inject: {
    fields: {
      strings: {
        brand: function() {
          return ['google', 'apple'][numbers.random(0, 1)]
        }
      },
      numbers: {}
    },
    dictionary: {
    	strings: {
    		names: {
    			firstName: function () {
    				return []
    			},
    			lastName: function () {
    				return []
    			}
    		},
    		emails: {

    		},
    		addresses: {

    		}
    	},
    	numbers: {

    	}
    }
  }
}