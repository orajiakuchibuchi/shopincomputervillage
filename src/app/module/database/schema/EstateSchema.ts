
export const EstateSchema:any  = {
  name: 'estates',
  columns: [
    {
      name: 'name',
      keypath: 'name',
      options: {
        unique: true
      }
    },
    {
      name: 'address',
      keypath: 'address',
      options: {
        unique: false
      }
    },
    {
      name: 'icon',
      keypath: 'icon',
      options: {
        unique: false
      }
    },
    {
      name: 'url',
      keypath: 'url',
      options: {
        unique: false
      }
    },
    {
      name: 'phone',
      keypath: 'phone',
      options: {
        unique: false
      }
    },
    {
      name: 'user_id',
      keypath: 'user_id',
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
  ]
}

