

export const ClientErrorSchema:any  = {
  name: 'client-errors',
  columns: [
    {
      name: 'type',
      keypath: 'type',
      options: {
        unique: false
      }
    },
    {
      name: 'priority',
      keypath: 'priority',
      options: {
        unique: false
      }
    },
    {
      name: 'message',
      keypath: 'message',
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

