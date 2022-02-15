

export const NotificationSchema:any  = {
  name: 'notifications',
  columns: [
    {
      name: 'title',
      keypath: 'title',
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
      name: 'icon',
      keypath: 'icon',
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
      name: 'user_id',
      keypath: 'user_id',
      options: {
        unique: false
      }
    }
  ]
}

