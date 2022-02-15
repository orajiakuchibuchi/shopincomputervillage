

export const ProductSchema:any  = {
  name: 'products',
  columns: [
    {
      name: 'name',
      keypath: 'name',
      options: {
        unique: false
      }
    },
    {
      name: 'price',
      keypath: 'price',
      options: {
        unique: false
      }
    },
    {
      name: 'discount',
      keypath: 'discount',
      options: {
        unique: false
      }
    },
    {
      name: 'created_at',
      keypath: 'created_at',
      options: {
        unique: false
      }
    },
    {
      name: 'updated_at',
      keypath: 'updated_at',
      options: {
        unique: false
      }
    },
    {
      name: 'storeId',
      keypath: 'storeId',
      options: {
        unique: false
      }
    },
    {
      name: 'size',
      keypath: 'size',
      options: {
        unique: false
      }
    },
    {
      name: 'color',
      keypath: 'color',
      options: {
        unique: false
      }
    },
    {
      name: 'description',
      keypath: 'description',
      options: {
        unique: false
      }
    },
    {
      name: 'quantity',
      keypath: 'quantity',
      options: {
        unique: false
      }
    },
  ]
}

