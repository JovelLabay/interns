interface FormLogin {
  email: string;
  password: string;
}

interface FormSchoolUserAdmin {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profileImage: string;
  levelOfUser: string;
  isActive: boolean;
}

interface ReturnAdminUserPayload {
  id: number;
  admin_user_image: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  password: string;
  isActive: boolean;
  level_of_user: string;
}
