import { USER, USER2, USER3 } from '../../features/data/usermock';
import { UsersRepo } from '../../core/services/user-repo/user.repo';
export const mockUser1 = USER;
mockUser1.uid = '000001';
export const mockUser2 = USER2;
mockUser2.uid = '000002';
export const mockUsers = [mockUser1, mockUser2];
export const mockAddUser = USER3;
mockAddUser.uid = '000003';
export const mockUpdateUser = { ...mockUser2, name: 'Update User' };

export const mockValidRepoResponse = () => {
    (UsersRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
    (UsersRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddUser);
    (UsersRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdateUser
    );
    (UsersRepo.prototype.delete as jest.Mock).mockResolvedValue(
        mockUser1.uid
    );
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (UsersRepo.prototype.load as jest.Mock).mockRejectedValue(error);
    (UsersRepo.prototype.create as jest.Mock).mockRejectedValue(error);
    (UsersRepo.prototype.update as jest.Mock).mockRejectedValue(error);
    (UsersRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
};
