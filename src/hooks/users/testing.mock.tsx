import { USER, USER2, USER3 } from '../../features/data/usermock';
import { ArtworksRepo } from '../../core/services/repository';
export const mockUser1 = USER;
mockUser1.uid = '000001';
export const mockUser2 = USER2;
mockUser2.uid = '000002';
export const mockUsers = [mockUser1, mockUser2];
export const mockAddUser = USER3;
mockAddUser.uid = '000003';
export const mockUpdateUser = { ...mockUser2, name: 'Update User' };

export const mockValidRepoResponse = () => {
    (ArtworksRepo.prototype.load as jest.Mock).mockResolvedValue(mockUsers);
    (ArtworksRepo.prototype.create as jest.Mock).mockResolvedValue(mockAddUser);
    (ArtworksRepo.prototype.update as jest.Mock).mockResolvedValue(
        mockUpdateUser
    );
    (ArtworksRepo.prototype.delete as jest.Mock).mockResolvedValue(
        mockUser1.uid
    );
};

const error = new Error('Testing errors');
export const mockNoValidRepoResponse = () => {
    (ArtworksRepo.prototype.load as jest.Mock).mockRejectedValue(error);
    (ArtworksRepo.prototype.create as jest.Mock).mockRejectedValue(error);
    (ArtworksRepo.prototype.update as jest.Mock).mockRejectedValue(error);
    (ArtworksRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
};
