

export const RoleSchema:any  = {
  name: 'roles',
  columns: [
    {
      name: 'name',
      keypath: 'name',
      options: {
        unique: true
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
      name: 'status',
      keypath: 'status',
      options: {
        unique: false
      }
    },
    {
      name: 'default',
      keypath: 'default',
      options: {
        unique: false
      }
    },
    {
      name: 'active',
      keypath: 'active',
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
    }
  ]
}

