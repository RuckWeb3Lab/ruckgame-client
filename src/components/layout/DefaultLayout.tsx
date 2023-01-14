import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SERVICE_NAME } from '@/globals/constants'
// Mui
import {
  AppBar,
  Button,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import HandymanIcon from '@mui/icons-material/Handyman'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import HistoryIcon from '@mui/icons-material/History'
import MenuIcon from '@mui/icons-material/Menu'
// Type
import type { FC, ReactNode } from 'react'
// Util
import { Web3AuthContext, Web3AuthProviderContext } from '@/pages/_app'

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = ({ children }) => {
  const [account, setAccount] = useState<string>('')
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null)
  const [web3auth, _] = useContext(Web3AuthContext)
  const [web3AuthProvider, setWeb3AuthProvider] = useContext(Web3AuthProviderContext)
  const [anchor, setAnchor] = useState<boolean>(false)

  const router = useRouter()

  const open = Boolean(accountMenu)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccountMenu(event.currentTarget)
  }
  const handleClose = () => {
    setAccountMenu(null)
  }

  const handlerSignOut = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      return
    }
    await web3auth.logout()
    setWeb3AuthProvider(null)
    router.push('/signin')
  }

  const goto = (path: string) => {
    router.push(path)
    setAnchor(false)
  }

  useEffect(() => {
    if (!web3AuthProvider) {
      router.push('/signin')
    } else {
      setAccount(web3AuthProvider.selectedAddress)
      console.log(web3AuthProvider.selectedAddress)
    }
  }, [web3AuthProvider, router])

  return (
    <>
      <Head>
        <title>{SERVICE_NAME}</title>
        <meta name="description" content={SERVICE_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setAnchor(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {SERVICE_NAME}
          </Typography>
          <Button
            id="account-button"
            color="inherit"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {`${account.slice(0, 6)}...${account.slice(-6)}`}
          </Button>
          <Menu
            id="account-menu"
            anchorEl={accountMenu}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'account-button',
            }}
          >
            <MenuItem onClick={() => handlerSignOut()}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" variant="temporary" open={anchor} onClose={() => setAnchor(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goto('/home')}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goto('/mint')}>
                <ListItemIcon>
                  <HandymanIcon />
                </ListItemIcon>
                <ListItemText primary="Mint" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goto('/gacha')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Gacha" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => goto('/history')}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg">{children}</Container>
    </>
  )
}

export default DefaultLayout
