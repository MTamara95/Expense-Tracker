using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IExpenseRepository
    {
        Task<PagedList<ExpenseDisplayDto>> GetAllExpenses(int userId, UserParams userParams);
        Task<Expense> GetExpense(int expenseId, int userId);
        Task<Expense> AddExpense(ExpenseForPutPostDto expense);
        Task<Expense> UpdateExpense(int expenseId, ExpenseForPutPostDto expense, int userId);
        Task<Expense> DeleteExpense(int expenseId, int userId);
        Task<double> GetAllExpensesSum(int userId);
    }
}
