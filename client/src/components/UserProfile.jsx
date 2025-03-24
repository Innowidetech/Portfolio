import React from 'react';
import { User } from 'lucide-react';

const UserProfile = ({ isDarkMode }) => (
  <User className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-black'}`} />
);

export default UserProfile;