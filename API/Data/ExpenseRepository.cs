using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ExpenseRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Expense>> GetAllExpenses(int userId)
        {
            return await _context.Expenses
                .Where(x => x.AppUserId == userId)
                .Include(x => x.Asset)
                .ToListAsync();
        }

        public async Task<Expense> GetExpense(int expenseId, int userId)
        {
            return await _context.Expenses
                .Include(x => x.Asset)
                .FirstOrDefaultAsync
                    (x => x.Id == expenseId && x.AppUserId == userId);
        }

        public async Task<Expense> AddExpense(ExpenseForPutPostDto expense)
        {
            var mappedExpense = _mapper.Map<Expense>(expense);

            var result = await _context.Expenses.AddAsync(mappedExpense);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Expense> UpdateExpense(int expenseId, ExpenseForPutPostDto expense, int userId)
        {
            var result = await _context.Expenses.FirstOrDefaultAsync
                (x => x.Id == expenseId && x.AppUserId == userId);

            if (result != null)
            {
                result.PurchaseDate = expense.PurchaseDate;
                result.Amount = expense.Amount;
                result.AssetId = expense.AssetId;

                await _context.SaveChangesAsync();
                return result;
            }

            return null;
        }

        public async Task<Expense> DeleteExpense(int expenseId, int userId)
        {
            var result = await _context.Expenses.FirstOrDefaultAsync
                (x => x.Id == expenseId && x.AppUserId == userId);
            if (result != null)
            {
                _context.Expenses.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<double> GetAllExpensesSum(int userId)
        {
            return await _context.Expenses
                .Where(x => x.AppUserId == userId)
                .SumAsync(x => x.Amount);
        }
    }
}
