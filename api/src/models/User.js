const mongoose = require('mongoose');
const { USER_ROLE, ADMIN_ROLE, ROLES_LIST } = require('../lib/roles');

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  zipcode: {
    type: String,
    default: null,
  },
  profilePhoto: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    default: null,
  },
  mobileCommonsProfileId: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ROLES_LIST,
    default: USER_ROLE,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

// TODO: POST-SAVE. Update MoCo profile if not already done.

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.statics.userModifiableFields = [
  'firstName', 'lastName', 'zipcode',
  'mobile',
];

UserSchema.statics.findByEmail = async function(email) {
  try {
    const user = await this.findOne({ email });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

UserSchema.statics.formatArrayOfUsers = async function(users, requestUser) {
  const formattedUsers = await Promise.all(users.map(async (user) =>
    await user.getApiResponse(requestUser)
  ));

  return formattedUsers;
};

UserSchema.methods.getApiResponse = async function (requestingUser) {
  if (this.isbanned && this.role !== ADMIN_ROLE) {
    return {
      id: this.id,
      isBanned: true,
    };
  }

  const response = {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    fullName: this.fullName,
    profilePhoto: this.profilePhoto,
    role: this.role,
    isBanned: this.isBanned,
    updatedAt: this.updatedAt,
    createdAt: this.createdAt,
  };

  if (requestingUser.id === this.id) {
    response.zipcode = this.zipcode;
    response.mobile = this.mobile;
  }

  return response;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
