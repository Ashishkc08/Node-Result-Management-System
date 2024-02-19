'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('students', [
      { name: 'Ashish Karamchandani', dateOfBirth: '2001-02-08', rollNumber: 'A001', score: 100, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Joey Tribbiani', dateOfBirth: '2000-10-17', rollNumber: 'A002', score: 90, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monica', dateOfBirth: '2000-04-21', rollNumber: 'A003', score: 95, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ross', dateOfBirth: '2001-03-20', rollNumber: 'A004', score: 85, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chandler Bing', dateOfBirth: '2001-12-21', rollNumber: 'A005', score: 90, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Priya Verma', dateOfBirth: '2001-06-02', rollNumber: 'A006', score: 90, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rachel Green', dateOfBirth: '2001-03-20', rollNumber: 'A007', score: 90, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
