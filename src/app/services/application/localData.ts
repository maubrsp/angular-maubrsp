export const localData = {
  applicationParams: {
    loading: false,
    appReady: false,
    showMenu: false,
    showPage: false,
    screenBreakpoints: [320, 520, 1024]
  },
  device: {
    browser: '',
    type: 'tv, mobile, desktop',
    screenWidth: '',
    screemHeight: ''
  },
  defaultData: {
    list: [
      { label: 'Feature Iten 1' },
      { label: 'Feature Iten 2' },
      { label: 'Feature Iten 3' },
      { label: 'Feature Iten 4' },
      { label: 'Feature Iten 5' },
      { label: 'Feature Iten 6' }
    ]
  },
  routerData: {},
  styleguide: {
    bg: '#ffffff',
    color1: '#eeeeee',
    color2: '#cccccc',
    color3: '#868686',
    headerHeight: '4em',
    paddingButtons: '0.7em',
    borderButtons: '4px',
    searchWidth: '18em',
    button1: {
      width: {
        normal: 'auto',
        disable: 'auto',
        hovered: 'auto'
      },
      horizontalPadding: {
        normal: '20',
        disable: '20',
        hovered: '13'
      },
      height: {
        normal: 50,
        disable: 48,
        hovered: 50
      },
      lineHeight: {
        normal: 50,
        disable: 50,
        hovered: 50
      },
      backgroundColor: {
        normal: '#228a4c',
        disable: '#63db93',
        hovered: '#007730'
      },
      textColor: {
        normal: '#ffffff',
        disable: '#ffffff',
        hovered: '#ffffff'
      },
      fontSize: {
        normal: '15',
        disable: '11',
        hovered: '17'
      },
      textWeight: {
        normal: 600,
        disable: 400,
        hovered: 800
      },
      borderRadius: {
        normal: 0,
        disable: 2,
        hovered: 6
      },
      borderStyle: {
        normal: 'groove',
        disable: 'solid',
        hovered: 'groove'
      },
      borderWidth: {
        normal: 0,
        disable: 1,
        hovered: 4
      },
      borderColor: {
        normal: '#868686',
        disable: '#868686',
        hovered: '#00b74a'
      }
    },
    icon1: {
      width: {
        normal: 50,
        disable: 50,
        hovered: 50
      },
      horizontalPadding: {
        normal: '20',
        disable: '20',
        hovered: '13'
      },
      height: {
        normal: 50,
        disable: 48,
        hovered: 50
      },
      lineHeight: {
        normal: 50,
        disable: 50,
        hovered: 50
      },
      backgroundColor: {
        normal: '#228a4c',
        disable: '#63db93',
        hovered: '#007730'
      },
      textColor: {
        normal: '#ffffff',
        disable: '#ffffff',
        hovered: '#ffffff'
      },
      fontSize: {
        normal: '15',
        disable: '11',
        hovered: '17'
      },
      textWeight: {
        normal: 600,
        disable: 400,
        hovered: 800
      },
      borderRadius: {
        normal: 0,
        disable: 2,
        hovered: 6
      },
      borderStyle: {
        normal: 'groove',
        disable: 'solid',
        hovered: 'groove'
      },
      borderWidth: {
        normal: 0,
        disable: 1,
        hovered: 4
      },
      borderColor: {
        normal: '#868686',
        disable: '#868686',
        hovered: '#00b74a'
      }
    },
    iconDefault: {
      width: {
        normal: 50,
        disable: 40,
        hovered: 60
      },
      horizontalPadding: {
        normal: 0,
        disable: 0,
        hovered: 0
      },
      height: {
        normal: 50,
        disable: 50,
        hovered: 50
      },
      lineHeight: {
        normal: 50,
        disable: 50,
        hovered: 47
      },
      backgroundColor: {
        normal: '#ffffff',
        disable: '#ffffff',
        hovered: '#ffffff'
      },
      textColor: {
        normal: '#ccc',
        disable: '#ccc',
        hovered: '#868686'
      },
      fontSize: {
        normal: '15',
        disable: '11',
        hovered: '17'
      },
      textWeight: {
        normal: 600,
        disable: 400,
        hovered: 800
      },
      borderRadius: {
        normal: 0,
        disable: 2,
        hovered: 1
      },
      borderStyle: {
        normal: 'groove',
        disable: 'solid',
        hovered: 'groove'
      },
      borderWidth: {
        normal: 0,
        disable: 1,
        hovered: 0
      },
      borderColor: {
        normal: '#fff',
        disable: '#ccc',
        hovered: '#ccc'
      }
    }
  },
  routes: [
    {
      path: 'home',
      data: {
        menuLabel: 'Proposta do projeto e abordagem técnica',
        menu: true
      },
      loadChildren: 'Home'
    },
    {
      path: 'tasks',
      data: {
        menuLabel: 'Tasks e todos',
        menu: true
      },
      loadChildren: 'TasksModule'
    },
    {
      path: 'design-system',
      data: {
        menuLabel: 'Design System Dinâmico',
        menu: true
      },
      loadChildren: 'ComponentsPageModule'
    },
    { path: '**', redirectTo: '/home' }
  ]
};
