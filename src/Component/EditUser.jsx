import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Api from "../Service/Api";
import { toast } from 'react-toastify';

const initialValue = {
  FirstName: "",
  LastName: "",
  username: "",
  email: "",
  Password: "",
  status: ""
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const EditUser = () => {
  const classes = useStyles();
  const [user, setUser] = useState(initialValue);
  const { FirstName, LastName, username, email, Password, status } = user;
  const { id, name1 } = useParams();
  console.log(name1);
  let history = useHistory();

  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserDetails = async () => {
    Api.get(`users/${id}`).then((res) => {
      setUser(res.data);
    });
  };

  const editUserDetails = async () => {
    Api.put(`users/${id}`, user).then((res) => {
      if (res.status === 200) {
        history.push("/");
        toast.success("User Updated Successfully")
      }
    });
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Edit User Details</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">First Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="FirstName"
          value={FirstName}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Last Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="LastName"
          value={LastName}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel type="password" htmlFor="my-input">Password</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="Password"
          value={Password}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Status</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="status"
          value={status}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editUserDetails()}
        >
          Submit
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default EditUser;
