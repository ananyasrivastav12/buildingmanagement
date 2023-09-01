import { User } from './main_db.js';

export async function createUser(id, password, capacity, start_time, end_time, assignment){
    try {
      const newUser = new User({
        _id: id,
        password: password,
        capacity: capacity,
        start_time: start_time,
        end_time: end_time,
        assignment: assignment,
      });
      const savedUser = await newUser.save();
      console.log('User created successfully:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Failed to create User:', error);
      throw error;
    }
  }
  
  export async function readUser(id){
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log('User not found');
        return null;
      }
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Failed to retrieve user:', error);
      throw error;
    }
  }
  
  export async function updateUser(id, capacity, start_time, end_time, assignment){
    const updates = {capacity: capacity, start_time: start_time, end_time: end_time, assignment: assignment};
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true
      });
      if (!updatedUser) {
        console.log('User not found');
        return null;
      }
      console.log('User updated successfully:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }
  
  export async function deleteUser(id){
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        console.log('User not found');
        return null;
      }
      console.log('User deleted successfully:', deletedUser);
      return deletedUser;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }
  
  export async function readAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error('Failed to retrieve users:', error);
      throw error;
    }
  }
  
  
  // ==================== TESTING ====================== // 
  
  
//   await createUser("11", 4, 9, 23, {12: [[2,4] , [9,10]]});
//   await createUser("7", 4, 9, 23, {14: [[2,4] , [9,10]]});
  
//   await readUser("7");
  
//   await updateUser("7", 3, 4, 8, {10: [[2,3], [6,9]]});
  
//   await deleteUser("11");
  
//   console.log(await readAllUsers());