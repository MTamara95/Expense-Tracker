using API.DTOs;
using API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IExpenseRepository
    {
        Task<IEnumerable<Expense>> GetAllExpenses(int userId);
        Task<Expense> GetExpense(int expenseId, int userId);
        Task<Expense> AddExpense(ExpenseForPutPostDto expense);
        Task<Expense> UpdateExpense(int expenseId, ExpenseForPutPostDto expense, int userId);
        Task<Expense> DeleteExpense(int expenseId, int userId);
    }
}
